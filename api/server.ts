import express from "express";
import cors from 'cors';
import { Octokit } from "octokit";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || '7878';
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

const app = express()
app.use(cors())

app.get('/github/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const query = `
            query($username: String!) {
                user(login: $username) {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    date
                                    contributionCount
                                }
                            }
                        }
                    }
                }
            }
        `;

        const result: any = await octokit.graphql(query, {
            username,
        })

        const days = result.user.contributionsCollection.contributionCalendar.weeks
            .flatMap((week: any) => week.contributionDays)
            .map((day: any) => ({
                date: day.date,
                count: day.contributionCount,
            }));

        res.status(200).json({
            username,
            total: result.user.contributionsCollection.contributionCalendar.totalContributions,
            days,
        });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            error: 'failed to get github data'
        });
    }
})

app.get('/leetcode/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const query = `
            query userProfileCalendar($username: String!, $year: Int) {
                matchedUser(username: $username) {
                    userCalendar(year: $year) {
                        submissionCalendar
                    }
                }
            }
        `;

        const getData = async (year: number) => {
            const result = await fetch('https://leetcode.com/graphql', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Referer": "https://leetcode.com",
                    "User-Agent": "Mozilla/5.0",
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        username,
                        year,
                    },
                }),
            })
            const data = await result.json()
            const parsed = JSON.parse(data?.data?.matchedUser?.userCalendar?.submissionCalendar || '{}');
            return parsed;
        }

        const now = new Date()
        const currY = now.getFullYear()
        const lastY = currY - 1;

        const [curr, last] = await Promise.all([
            getData(currY),
            getData(lastY)
        ])

        const merged = {...last, ...curr};
        const oneYearAgo = new Date(now)
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        const days = Object.entries(merged)
            .map(([ts, count]) => ({
                date: new Date(Number(ts) * 1000),
                count: Number(count),
            }))
            .filter(d => d.date >= oneYearAgo && d.date <= now)
            .map(d => ({
                date: d.date.toISOString().slice(0, 10),
                count: d.count,
            }))
            .sort((a, b) => a.date.localeCompare(b.date));

        const total = days.reduce((sum, d) => sum + d.count, 0);

        res.status(200).json({
            username,
            total,
            days,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'failed to get leetcode data'
        })
    }
})

app.listen(PORT, () => {
    console.log('Server is listening on:', PORT)
})

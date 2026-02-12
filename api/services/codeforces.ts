export async function codeforcesActivity(username: string) {
    const res = await fetch(
        `https://codeforces.com/api/user.status?handle=${username}`
    );

    const data: any = await res.json();

    if (data.status !== "OK") {
        throw new Error("Failed to fetch Codeforces data");
    }

    const submissions = data.result;

    const map = new Map<string, number>();

    const oneYearAgo = Math.floor(
        new Date().setFullYear(new Date().getFullYear() - 1) / 1000
    );

    for (const sub of submissions) {
        if (sub.creationTimeSeconds < oneYearAgo) break;

        const date = new Date(sub.creationTimeSeconds * 1000)
            .toISOString()
            .slice(0, 10);

        map.set(date, (map.get(date) || 0) + 1);
    }

    const days = Array.from(map.entries()).map(([date, count]) => ({
        date,
        count,
    }));

    return {
        username,
        total: days.reduce((s, d) => s + d.count, 0),
        days,
    };
}

import React, { useEffect, useState } from "react";
import { Trophy, Clock, Users } from "lucide-react";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { contestService } from "../../services/placeholderServices";

const Contests = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contestService.list().then((res) => setData(res.data));
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold">Contests</h1>
        <p className="text-sm text-ink-400">Compete, climb the leaderboard, and win badges.</p>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-400">Live now</h2>
        {data.live.length === 0 ? (
          <EmptyState title="No live contests" subtitle="Check back soon or browse upcoming contests below." />
        ) : (
          data.live.map((c) => (
            <div key={c.id} className="card flex items-center justify-between border-l-4 border-l-rose-500 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-ink-800">{c.title}</p>
                  <p className="flex items-center gap-1 text-xs text-rose-500">
                    <Clock className="h-3 w-3" /> Ends in {c.ends}
                  </p>
                </div>
              </div>
              <button className="btn-primary">Join Now</button>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-400">Upcoming</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.upcoming.map((c) => (
            <div key={c.id} className="card p-5">
              <p className="font-semibold text-ink-800">{c.title}</p>
              <p className="mt-1 text-xs text-ink-400">Starts {c.starts}</p>
              <button className="btn-secondary mt-4 w-full justify-center">Set Reminder</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-400">Past contests</h2>
        <div className="card divide-y divide-ink-50">
          {data.past.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4">
              <p className="text-sm font-medium text-ink-700">{c.title}</p>
              <p className="flex items-center gap-1 text-xs text-ink-400">
                <Users className="h-3.5 w-3.5" /> {c.participants} participants
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contests;

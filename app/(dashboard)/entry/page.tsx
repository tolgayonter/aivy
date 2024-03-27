import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";

const getEntries = async () => {
  const user = await getUserByClerkID();

  const entries = await prisma.entry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return entries;
};

const EntryListPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-10 bg-zinc-100 h-full">
      <h2 className="text-3xl mb-10">Entries</h2>
      <div className="grid grid-cols-3 gap-5">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/entry/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EntryListPage;

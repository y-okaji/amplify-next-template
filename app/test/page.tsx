import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import outputs from "@/amplify_outputs.json";
import RevalidateTest from "@/components/revalidate";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default async function Page() {
  const hoge = await client.models.Todo.list();
  const fuga = await fetch('https://main.dekb8xv2lg4hy.amplifyapp.com/api', {
    next: { tags: ['test-revalidate'] },
  });
  const resp = await fuga.json().catch(() => "");
  return (
    <>
       {hoge.data.map(v => (
        <div className="flex" key={v.id}>
          {v.id}: {v.content}
        </div>
      ))}
      <div>
        apiresponse: {JSON.stringify(resp)}
      </div>
      <div>
        <RevalidateTest />
      </div>
    </>
  )
}

import { Form, Link } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";


export default function PostButton({id, can_edit, can_delete}: {
  id: string,
  can_edit: boolean,
  can_delete: boolean,
}) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    if (!window.confirm('本当に削除しますか？')) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className="text-right">
      {can_edit &&
        <Link to={"/posts/"+id+"/edit"} className={buttonVariants()}>編集</Link>
      }
      {can_delete &&
        <Form method="delete" className="inline-block ml-1" onSubmit={handleSubmit}>
          <Button type="submit" variant="destructive">削除</Button>
        </Form>
      }
    </div>
  );
}

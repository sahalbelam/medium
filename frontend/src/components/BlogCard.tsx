import { Link } from "react-router-dom";

interface BlogsProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id: number;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
  id,
}: BlogsProps) => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.split(" ").length; // Count the number of words
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return (
    <Link className="block w-full max-w-3xl" to={`/blog/${id}`}>
      <div className="px-4 w-full max-w-4xl bg-white rounded-lg hover:cursor-pointer">
        <div className="pt-3 border-slate-200 pb-4 border-b-2 ">
          <div className="flex items-center">
            <div className="mr-2 flex">
              <Avatar name={authorName} />
            </div>
            <div className="mr-1 text-lg">{authorName} •</div>
            <div className="text-slate-500 text-base">{publishDate}</div>
          </div>
          <div className="text-2xl font-bold">{title}</div>
          <div className="text-lg text-slate-600">
            {content.slice(0, 100) + "..."}
          </div>
          <div className="text-sm font-light text-slate-500">
            {`${readingTime} minute(s) to read`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-semibold text-xl text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}

export default BlogCard;

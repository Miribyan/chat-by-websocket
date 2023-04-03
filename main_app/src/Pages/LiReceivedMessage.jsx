import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function LiReceivedMessage({ message, recipients }) {
  const navigate = useNavigate();

  const findName = (id) => {
    let name = recipients.find((item) => item.id === id).name;
    return name;
  };
  const replyToMessage = (id) => {
    navigate(`send-message/${id}`);
  };

  return (
    <li
      onClick={() => replyToMessage(message.sender_id)}
      key={message.id}
      className="relative bg-white px-4 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
    >
      <div className="flex justify-between space-x-3">
        <div className="min-w-0 flex-1">
          <div className="block focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="truncate text-sm font-medium text-gray-900">
              {findName(message.sender_id)}
            </p>
            <p className="truncate text-sm text-gray-500">{message.subject}</p>
          </div>
        </div>
        <time className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
          {format(new Date(message.send_date), "dd/MM/yy")}
        </time>
      </div>
      <div className="mt-1">
        <p className="line-clamp-8 text-sm text-gray-600">{message.message}</p>
      </div>
    </li>
  );
}

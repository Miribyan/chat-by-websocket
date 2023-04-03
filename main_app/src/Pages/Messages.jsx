import { format } from "date-fns";

function Messages({ messages, currentRecipientName }) {
  return (
    <div className="h-2/5 my-5 p-2 bg-gray-100 rounded-lg drop-shadow-lg overflow-y-scroll">
      <ul className="divide-y divide-gray-200 ">
        {messages.map((message) => (
          <li
            key={message.id}
            className="relative bg-gray-50 py-5 px-4 rounded-md focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 hover:bg-white"
          >
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className=" text-sm font-medium text-gray-900">
                  {currentRecipientName}
                </p>
                <p className=" text-sm text-gray-500">{message.subject}</p>
              </div>
              <time className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(message.send_date), "dd/MM/yy")}
              </time>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-600 line-clamp-4">
                {message.message}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;

import ReactTextareaAutosize from "react-textarea-autosize";
import TimeAgo from "../atoms/text/TimeAgo";
import ErrorMessages from "../atoms/message/ErrorMessages";
import { useState } from "react";
import twitterText from "twitter-text";
import { postComment } from "../../apis/comment";

const CommentModal = ({ item, handleUserClick, setIsCommentModalOpen }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [comment, setComment] = useState("");
  const [isCommentButtonDisabled, setIsCommentButtonDisabled] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await postComment(item.id, comment.trim());
    if (response.success) {
      onClose();
    } else {
      setErrorMessages(response.errors);
    }
  };

  const onClose = () => {
    setComment("");
    setIsCommentModalOpen(false);
    setIsCommentButtonDisabled(true);
  };

  const handleCommentChange = (e) => {
    const newComment = e.target.value;
    const commentLength = twitterText.parseTweet(newComment).weightedLength;

    if (commentLength <= 280) {
      setComment(newComment);
      setIsCommentButtonDisabled(newComment.trim() === "");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-6 text-center bg-black rounded-lg shadow-lg w-[600px]"
      >
        <ErrorMessages messages={errorMessages} />
        <div className="flex justify-start pb-4">
          <button
            className="px-4 py-2 font-bold text-white rounded-full hover:bg-gray-800"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className="flex">
          {item.user.avatar_url && (
            <img
              src={item.user.avatar_url}
              alt="Avatar"
              className="w-12 h-12 mr-4 rounded-full"
              onClick={handleUserClick}
            />
          )}
          <div className="font-bold text-left">
            <span className="mr-4" onClick={handleUserClick}>
              {item.user.name}
            </span>
            <TimeAgo dateString={item.created_at} />
          </div>
        </div>
        <div className="pt-2 text-left break-all">{item.body}</div>
        <form className="flex flex-col items-end pt-2">
          <ReactTextareaAutosize
            className="w-full text-xl focus:border-none focus:outline-none"
            value={comment}
            onChange={handleCommentChange}
            placeholder="返信をポスト"
            maxRows={12}
            minRows={3}
          />
          <button
            onClick={onSubmit}
            className={`px-4 py-2 mt-2 mr-2 text-white bg-blue-500 rounded-full ${
              isCommentButtonDisabled ? "opacity-50" : "hover:bg-blue-600"
            }`}
            disabled={isCommentButtonDisabled}
          >
            返信
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;

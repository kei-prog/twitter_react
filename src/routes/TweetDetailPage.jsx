import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTweet } from "../apis/tweet";
import TweetDetail from "../components/atoms/field/TweetDetail";
import ErrorMessages from "../components/atoms/message/ErrorMessages";
import { getComments } from "../apis/comment";
import CommentItems from "../components/molecules/CommentItems";
import SideMenu from "../components/molecules/SideMenu";

const TweetDetailPage = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchTweet = async () => {
      const response = await getTweet(id);
      if (response.success) {
        setTweet(response.data);
      } else {
        setErrorMessages(response.errors);
      }
    };

    fetchTweet();
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await getComments(id, offset);
    if (response.success) {
      const newComments = response.data;
      if (newComments.length === 0) {
        setHasMore(false);
        return;
      }
      setComments([...comments, ...newComments]);
      setOffset(offset + newComments.length);
    } else {
      setHasMore(false);
      setErrorMessages(response.errors);
    }
  };

  return (
    <div className="flex flex-1">
      <SideMenu />
      <div className="flex-1 max-w-screen-sm">
        <ErrorMessages messages={errorMessages} />
        {tweet && <TweetDetail tweet={tweet} />}
        <CommentItems
          items={comments}
          hasMore={hasMore}
          fetchComments={fetchComments}
        />
      </div>
    </div>
  );
};

export default TweetDetailPage;

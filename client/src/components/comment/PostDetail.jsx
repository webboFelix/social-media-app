import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Comment from "./Comment";
import { useAddCommentMutation, useFetchCommentsQuery } from "./commentsApi";

const PostDetail = () => {
  const [comment, setComment] = useState("");
  //const navigate = useNavigate();

  const { postId } = useParams();

  // fetch all comments by postId
  /**
   * let { data: comments } = useFetchCommentsQuery(postId) || {};

  let totals = comments?.map((item) => item?.replies?.length);

  let ultimateTotal = totals?.reduce((acc, item) => acc + item, 0);

  ultimateTotal = ultimateTotal + comments?.length;

   */
  // add comments to post by postId

  const [addComment] = useAddCommentMutation() || {};

  const submitHandler = (e) => {
    e.preventDefault();

    addComment({
      postId: postId,
      data: {
        postId: postId,
        username: "admin",
        comment: comment,
      },
    });

    setComment("");
  };

  return (
    <>
      <section class="bg-white mt-4 mb-2 dark:bg-gray-900 py-8 lg:py-16">
        <div class="max-w-2xl mx-auto px-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({/*Number(ultimateTotal)*/})
            </h2>
          </div>
          <form onSubmit={submitHandler} class="mb-6">
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" class="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                onChange={(e) => setComment(e.target.value)}
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              />
            </div>
            <button
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange-500 rounded-lg focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-900 hover:bg-orange-600"
            >
              Post comment
            </button>
          </form>

          {/*comments?.map((comment) => {
            return <Comment key={comment?._id} comment={comment} />;
          })*/}
        </div>
      </section>
    </>
  );
};

export default PostDetail;

// <div className='container mt-4 mb-4 mx-auto'>
//                 <h3 className='text-center'>All Comments ({comments?.length})</h3>

//                 {
//                     comments?.map((comment) => {
//                         return <Comment key={comment?._id} comment={comment} />
//                     })
//                 }

//             </div>

//             <div className='container mx-auto'>
//                 <h2 className='text-center mt-5 py-5 px-2 text-4xl'>Add Comments</h2>
//                 <hr />
//                 <div className='mx-10 px-6 mt-4 mb-2'>
//                     <form onSubmit={submitHandler}>
//                         <textarea placeholder='comment...' className='border-2 mt-2 mb-2 py-2 px-2 text-bold text-xl' value={comment} onChange={(e) => setComment(e.target.value)} />
//                         <button className="rounded-sm px-2 mx-2 my-1 bg-green-600 text-white" type='submit'>Submit</button>
//                     </form>
//                 </div>
//             </div>

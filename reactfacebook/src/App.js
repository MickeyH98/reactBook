import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.HandleComment = this.HandleComment.bind(this);
    this.PostComment = this.PostComment.bind(this);
    this.DeleteComment = this.DeleteComment.bind(this);
    this.AddLike = this.AddLike.bind(this);
    this.AddDislike = this.AddDislike.bind(this);
    this.HandleReply = this.HandleReply.bind(this);
    this.PostReply = this.PostReply.bind(this);
    this.ShowReplies = this.ShowReplies.bind(this);
    this.state = {
      userComment: '',
      commentList: []
    }
  };

  HandleComment(event){
    let Comment = event.target.value;
    let newState = Object.assign({}, this.state);
    newState = Comment;
    this.setState({
      userComment: newState
    })
  }

  PostComment(){
    let nComment = this.state.userComment;
    if (nComment === ''){
      alert("Your comment is empty!")
      return;
    }
    let newComment = {
      comment: nComment,
      likes: 0,
      dislikes: 0,
      userReply: '',
      replies: [],
      repliesShown: false
    }
    let commentList = [...this.state.commentList];
    commentList.push(newComment);
    this.setState({
      commentList: commentList,
      userComment: ''
    })
  }

  HandleReply(event, index){
    let Reply = event.target.value;
    let newState = Object.assign({}, this.state);
    newState.commentList[index].userReply = Reply;
    this.setState(newState);
  }

  PostReply(index){
    let newState = Object.assign({}, this.state);
    let newReply = {
      reply: newState.commentList[index].userReply,
      likes: 0,
      dislikes: 0,
    }
    if (newReply.reply === ''){
      alert("Your reply is empty!")
      return;
    }
    newState.commentList[index].replies.push(newReply);
    newState.commentList[index].userReply = '';
    this.setState(newState);
  }

  ShowReplies(index){
    let commentList = [...this.state.commentList];
    commentList[index].repliesShown = !commentList[index].repliesShown
    this.setState({
      commentList: commentList
    })
  }

  ReplyAddLike(parentIndex, childIndex){
    let commentList = [...this.state.commentList];
    commentList[parentIndex].replies[childIndex].likes++;
    this.setState({
      commentList: commentList
    })
  }

  ReplyAddDislike(parentIndex, childIndex){
    let commentList = [...this.state.commentList];
    commentList[parentIndex].replies[childIndex].dislikes++;
    this.setState({
      commentList: commentList
    })
  }

  DeleteReply(parentIndex, childIndex){
    let commentList = this.state.commentList;
    commentList[parentIndex].replies.splice(childIndex, 1);
    this.setState({
      commentList: commentList
    })
  }

  AddLike(index){
    let commentList = [...this.state.commentList];
    commentList[index].likes++;
    this.setState({
      commentList: commentList
    })
  }

  AddDislike(index){
    let commentList = [...this.state.commentList];
    commentList[index].dislikes++;
    this.setState({
      commentList: commentList
    })
  }

  DeleteComment(index){
    let commentList = this.state.commentList;
    commentList.splice(index, 1);
    this.setState({
      commentList: commentList
    })
  }

  render() {
   const showComments = this.state.commentList.map(function(commentObj, index){
     var parentIndex = index;
     const showReplies = commentObj.replies.map(function(replyObj, childIndex){
       return(
         <div key={childIndex} className="reply">
           <p className="replyText">{replyObj.reply}</p>
           <button className="likeButton" onClick={()=>{this.ReplyAddLike(parentIndex, childIndex)}}>{replyObj.likes} Like{replyObj.likes === 1? "":"s"}</button>
           <button className="dislikeButton" onClick={()=>{this.ReplyAddDislike(parentIndex, childIndex)}}>{replyObj.dislikes} Dislike{replyObj.dislikes === 1? "":"s"}</button>
           <button className="deleteButton" onClick={()=>{this.DeleteReply(parentIndex, childIndex)}}>Delete</button>
         </div>
       )
     }, this)

      return (
        <div className="comment" key={index}>

          <p className="commentText">{commentObj.comment}</p>

          <button className="deleteButton" onClick={()=>{this.DeleteComment(index)}}>Delete</button>
          <button className="likeButton"
            onClick={
              ()=>{this.AddLike(index)}}>
              {commentObj.likes} Like{commentObj.likes === 1? "":"s"}
          </button>
          <button className="showReplyButton" onClick={()=>this.ShowReplies(index)}>{this.state.commentList[index].replies.length} {this.state.commentList[index].replies.length === 1? "Reply":"Replies"}</button>
          <button className="dislikeButton" onClick={()=>{this.AddDislike(index)}}>{commentObj.dislikes} Dislike{commentObj.dislikes === 1? "":"s"}</button>
          {this.state.commentList[index].repliesShown &&
            <div className="replyContainer" id="replyContainer">
              <input className="replyBox" type="text" placeholder="Leave a reply!" value={this.state.commentList[parentIndex].userReply} onChange={(event)=>{this.HandleReply(event, index)}}/>
              <input className="replyButton" type="submit" value="Reply" onClick={()=>{this.PostReply(index)}}/>
              {showReplies}
            </div>
          }

        </div>
      )
    }, this)

    return (
      <div className="App">
        <h1>ReactBook</h1>

        <div className="commentSubmit">
          <input className="commentBox" type="text" placeholder="Leave a comment!" onChange={this.HandleComment} value={this.state.userComment}/>
          <input className="commentButton" type="submit" onClick={this.PostComment} />
        </div>

        <div className="commentList">
        {showComments}
        </div>

      </div>
    );
  }
}

export default App;

// React Challenge:

// Create a way to collect user comments and then delete them
// Create a thumbs up / thumbs down counter for these comments
// Create a way to write responses to the original comment
// Create a thumbs up / thumbs down counter for these comments and ability to delete

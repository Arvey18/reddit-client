import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import copy from 'clipboard-copy';

// styles
import './style.scss';

// images
import ProfileImage from '../../../assets/images/matt.jpg';

// semantic ui
import {Comment, Popup} from 'semantic-ui-react';

// interface
interface IProps {
  collapse: boolean;
  data: any;
}

const CommentBlock = ({collapse, data}: IProps): ReactElement => {
  // use states
  const [viewReplies, setViewReplies] = React.useState(false);

  // custom functions
  const handleTimeStamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let time = '';

    if (hours === 0) {
      time = minutes + ' minutes ago';
    } else if (minutes === 0) {
      time = seconds + ' minutes ago';
    } else {
      time = hours + ' hours ago';
    }

    return time;
  };

  const handleShareComment = (permalink: string) => {
    copy('https://www.reddit.com' + permalink);
  };

  const handleDisplayReplies = (data: any) => {
    const comment: any = [];
    if (data.length > 0) {
      data.map((datar: any, keyr: any) => {
        return comment.push(
          <Comment.Group collapsed={!viewReplies} key={datar.id + keyr}>
            <Comment>
              <Comment.Avatar as="a" src={ProfileImage} />
              <Comment.Content>
                <Comment.Author as="a">
                  {datar.author.name} - {datar.score} points
                </Comment.Author>
                <Comment.Metadata>
                  <span>{handleTimeStamp(datar.created_utc)}</span>
                </Comment.Metadata>
                <Comment.Text>{ReactHtmlParser(datar.body_html)}</Comment.Text>
                <Comment.Actions>
                  <Popup
                    content="Click to Copy Link"
                    trigger={
                      <div
                        className="action-button"
                        onClick={() => handleShareComment(datar.permalink)}
                      >
                        Share
                      </div>
                    }
                  />
                </Comment.Actions>
              </Comment.Content>
              {handleDisplayReplies(datar.replies)}
            </Comment>
          </Comment.Group>
        );
      });
    }
    return comment;
  };

  const handleViewReplies = () => {
    if (viewReplies) {
      setViewReplies(false);
    } else {
      setViewReplies(true);
    }
  };
  return (
    <div className="comment-block">
      {data ? (
        <Comment.Group collapsed={collapse}>
          <Comment>
            <Comment.Avatar as="a" src={ProfileImage} />
            <Comment.Content>
              <Comment.Author as="a">
                {data.author.name} - {data.score} points
              </Comment.Author>
              <Comment.Metadata>
                <span>{handleTimeStamp(data.created_utc)}</span>
              </Comment.Metadata>
              <Comment.Text>{ReactHtmlParser(data.body_html)}</Comment.Text>
              <Comment.Actions>
                <Popup
                  content="Click to Copy Link"
                  trigger={
                    <div
                      className="action-button"
                      onClick={() => handleShareComment(data.permalink)}
                    >
                      Share
                    </div>
                  }
                />
              </Comment.Actions>
            </Comment.Content>

            {data.replies.length > 0
              ? data.replies.map((datar: any, keyr: any) => {
                  return keyr === 0 ? (
                    <Comment.Group key={datar.id + keyr} collapsed={false}>
                      <Comment>
                        <Comment.Avatar as="a" src={ProfileImage} />
                        <Comment.Content>
                          <Comment.Author as="a">
                            {datar.author.name} - {datar.score} points
                          </Comment.Author>
                          <Comment.Metadata>
                            <span>{handleTimeStamp(datar.created_utc)}</span>
                          </Comment.Metadata>
                          <Comment.Text>
                            {ReactHtmlParser(datar.body_html)}
                          </Comment.Text>
                          <Comment.Actions>
                            <Popup
                              content="Click to Copy Link"
                              trigger={
                                <div
                                  className="action-button"
                                  onClick={() =>
                                    handleShareComment(datar.permalink)
                                  }
                                >
                                  Share
                                </div>
                              }
                            />
                          </Comment.Actions>
                        </Comment.Content>
                        {handleDisplayReplies(datar.replies)}
                      </Comment>
                    </Comment.Group>
                  ) : (
                    <Comment.Group
                      collapsed={!viewReplies}
                      key={datar.id + keyr}
                    >
                      <Comment>
                        <Comment.Avatar as="a" src={ProfileImage} />
                        <Comment.Content>
                          <Comment.Author as="a">
                            {datar.author.name} - {datar.score} points
                          </Comment.Author>
                          <Comment.Metadata>
                            <span>{handleTimeStamp(datar.created_utc)}</span>
                          </Comment.Metadata>
                          <Comment.Text>
                            {ReactHtmlParser(datar.body_html)}
                          </Comment.Text>
                          <Comment.Actions>
                            <Popup
                              content="Click to Copy Link"
                              trigger={
                                <div
                                  className="action-button"
                                  onClick={() =>
                                    handleShareComment(datar.permalink)
                                  }
                                >
                                  Share
                                </div>
                              }
                            />
                          </Comment.Actions>
                        </Comment.Content>
                        {handleDisplayReplies(datar.replies)}
                        {/* {commentlist} */}
                      </Comment>
                    </Comment.Group>
                  );
                })
              : null}
          </Comment>
        </Comment.Group>
      ) : null}
      {!collapse && data.replies.length > 1 ? (
        <div onClick={handleViewReplies} className="view-replies">
          {viewReplies ? 'Hide Replies' : 'View Replies'}
        </div>
      ) : null}
    </div>
  );
};

const stateToProps = () => ({});

const actionsToProps = (dispatch: any) => ({});

export default connect(stateToProps, actionsToProps)(CommentBlock);

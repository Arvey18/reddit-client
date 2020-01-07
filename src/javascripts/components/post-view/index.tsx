import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import {GET_POST} from '../../actions/post';
import ReactHtmlParser from 'react-html-parser';
import copy from 'clipboard-copy';

// styles
import './style.scss';

// components
import CommentBlock from '../comment-block';

// semantic ui
import {
  Transition,
  Dropdown,
  Image,
  Icon,
  Embed,
  Menu,
  Header,
} from 'semantic-ui-react';

// interface
interface IProps {
  show: boolean;
  id: string;
  post: any;
  comments: any;
  getPost: (id: string) => void;
  handleView: (id: string, show: boolean) => void;
}

const PostView = ({
  show,
  id,
  post,
  comments,
  getPost,
  handleView,
}: IProps): ReactElement => {
  // variables
  const options = [
    {key: 'copy-link', value: post.permalink, text: 'Copy', icon: 'copy'},
  ];

  // use states
  const [collapse, setCollapse] = React.useState(true);

  // custom functions
  const handleShow = () => {
    getPost(id);
  };

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

  const handleCopyLink = (event: React.SyntheticEvent, data: any) => {
    copy('https://www.reddit.com' + data.value);
  };

  const handleViewComments = () => {
    if (collapse) {
      setCollapse(false);
    } else {
      setCollapse(true);
    }
  };

  const handleCloseModal = () => {
    handleView(id, false);
    setCollapse(true);
  };
  return (
    <Transition
      animation="slide up"
      onShow={handleShow}
      unmountOnHide={true}
      visible={show}
    >
      <div id="postView">
        {post.id && post.id === id ? (
          <div className="post-view-data">
            <div className="one post-view-data-details">
              <Icon
                onClick={handleCloseModal}
                className="close-modal"
                name="window close outline"
              />
              <h1 className="title">{post.title}</h1>
              <div className="author">
                Posted By: {post.author ? post.author.name : ''} -{' '}
                {handleTimeStamp(post.created_utc)}
              </div>
              {post.preview ? (
                post.is_video ? (
                  post.media !== null && post.media.reddit_video ? (
                    <div className="preview-video">
                      <Embed
                        placeholder={post.preview.images[0].source.url}
                        url={post.media.reddit_video.scrubber_media_url}
                      />
                    </div>
                  ) : (
                    <Image
                      src={post.preview.images[0].source.url}
                      centered={true}
                    />
                  )
                ) : post.media !== null && post.media.oembed ? (
                  <div className="preview-video">
                    {ReactHtmlParser(post.media.oembed.html)}
                  </div>
                ) : (
                  <Image
                    src={post.preview.images[0].source.url}
                    centered={true}
                  />
                )
              ) : (
                <div className="thread-post">
                  <Icon name="comments" />
                </div>
              )}
              <div className="post-view-data-detail-footer">
                <div>
                  <Icon name="comments" /> {post.num_comments} Comments
                </div>
                <div>
                  <Icon name="arrow up" /> {post.ups} Ups
                </div>
                <div>
                  <Icon name="arrow down" /> {post.downs} Downs
                </div>
                <div>
                  <Menu compact>
                    <Dropdown
                      onChange={handleCopyLink}
                      text="SHARE"
                      options={options}
                      simple
                      item
                    />
                  </Menu>
                </div>
              </div>
              <div className="comments-container">
                <Header as="h3" dividing>
                  Comments
                </Header>
                {comments.length > 1
                  ? comments.map((value: any, key: any) => {
                      return key <= 2 ? (
                        <CommentBlock collapse={false} data={value} />
                      ) : (
                        <CommentBlock collapse={collapse} data={value} />
                      );
                    })
                  : null}
                {comments.length > 1 ? (
                  <div
                    className="view-comments-button"
                    onClick={handleViewComments}
                  >
                    {collapse ? 'View Comments' : 'Hide Comments'}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Transition>
  );
};

const stateToProps = ({posts, comments}: any) => ({
  post: posts.post.data,
  comments: posts.post.comments,
});

const actionsToProps = (dispatch: any) => ({
  getPost: (id: string) => dispatch(GET_POST(id)),
});

export default connect(stateToProps, actionsToProps)(PostView);

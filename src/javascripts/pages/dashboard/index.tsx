import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import {GET_POSTS} from '../../actions/post';
import ReactHtmlParser from 'react-html-parser';
import {Redirect} from 'react-router-dom';

// components
import PostView from '../../components/post-view';

// styles
import './style.scss';

// images
import Logo from '../../../assets/images/logo.svg';
import LogoText from '../../../assets/images/logo-text.svg';

// semantic ui
import {
  Grid,
  Embed,
  Dropdown,
  Transition,
  Card,
  Button,
  Icon,
} from 'semantic-ui-react';

// interface
interface IProps {
  history: any;
  getPosts: (filter: string) => void;
  getPost: (id: string) => void;
  posts: any;
}

const Dashboard = ({history, getPosts, posts}: IProps): ReactElement => {
  // variables
  const options = [
    {
      key: 'h',
      value: 'Hot',
      text: 'Hot',
      icon: 'hotjar',
    },
    {key: 'n', value: 'New', text: 'New', icon: 'sun'},
    {key: 't', value: 'Top', text: 'Top', icon: 'arrow up'},
    {key: 'con', value: 'Controversial', text: 'Controversial', icon: 'key'},
  ];
  const entered = localStorage.getItem('entered');

  //use states
  const [sortPost, setSortPost] = React.useState('Hot');
  const [showPost, setShowPost] = React.useState(false);
  const [showPostID, setShowPostID] = React.useState('');

  // use effects
  React.useEffect(() => {
    document.title = 'Dashboard | Reddit Client';
  }, []);

  React.useEffect(() => {
    handleGetdata(sortPost); // eslint-disable-next-line
  }, [sortPost]);

  // custom functions
  const handleSortChange = (event: React.SyntheticEvent, data: any) => {
    setSortPost(data.value);
  };

  const handleGetdata = (sort: string) => {
    let key = 'h';
    if (sort === 'Top') {
      key = 't';
    } else if (sort === 'New') {
      key = 'n';
    } else if (sort === 'Controversial') {
      key = 'con';
    } else {
      key = 'h';
    }
    getPosts(key);
  };

  const handleGoBack = () => {
    localStorage.setItem('entered', 'false');
    history.push('/');
  };

  const handleViewPost = (id: string, show: boolean) => {
    setShowPost(show);
    setShowPostID(id);
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

  return (
    <div id="dashboard">
      {entered === 'false' ? <Redirect to="/" /> : null}
      <PostView
        handleView={(id: string, show: boolean) => handleViewPost(id, show)}
        show={showPost}
        id={showPostID}
      />
      <div className="dashboard-header">
        <div className="one dashboard-header-left">
          <img src={Logo} alt="logo" className="logo" />
          <img className="logo-text" src={LogoText} alt="logo-text" />
          <div className="dashboard-title">Home</div>
          <div className="sort-filter">
            <span className="sort-text">Sort Posts:</span>
            <Dropdown
              onChange={handleSortChange}
              options={options}
              inline
              text={sortPost}
            />
          </div>
        </div>
        <div>
          <Button onClick={handleGoBack} icon>
            <Icon className="back-icon" name="arrow left" />
          </Button>
        </div>
      </div>
      <div className="dashboard-body">
        <div className="dashboard-post-container">
          <Grid columns={3}>
            {posts.length > 1
              ? posts.map((value: any, key: number) => {
                  return (
                    <Grid.Column key={key}>
                      <Transition
                        visible={true}
                        animation="scale"
                        duration={500}
                      >
                        <Card fluid={true}>
                          <div className="card-preview">
                            {value.preview ? (
                              value.is_video ? (
                                value.media !== null &&
                                value.media.reddit_video ? (
                                  <Embed
                                    aspectRatio="4:3"
                                    placeholder={
                                      value.preview.images[0].source.url
                                    }
                                    url={
                                      value.media.reddit_video
                                        .scrubber_media_url
                                    }
                                  />
                                ) : (
                                  <div
                                    className="image-preview"
                                    style={{
                                      backgroundImage:
                                        'url(' +
                                        value.preview.images[0].source.url +
                                        ')',
                                    }}
                                  ></div>
                                )
                              ) : value.media !== null && value.media.oembed ? (
                                ReactHtmlParser(value.media.oembed.html)
                              ) : (
                                <div
                                  className="image-preview"
                                  style={{
                                    backgroundImage:
                                      'url(' +
                                      value.preview.images[0].source.url +
                                      ')',
                                  }}
                                ></div>
                              )
                            ) : (
                              <div className="thread-post">
                                <Icon name="comments" />
                              </div>
                            )}
                          </div>
                          <Card.Content>
                            <Card.Header
                              onClick={() => handleViewPost(value.id, true)}
                              className="card-header"
                            >
                              {value.title}
                            </Card.Header>
                            <Card.Meta>
                              <span className="date">
                                Posted {handleTimeStamp(value.created_utc)}
                              </span>
                            </Card.Meta>
                            <Card.Description>
                              Posted By {value.author.name}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <div className="action-button">
                              <Icon name="comments" />
                              {value.num_comments} Comments
                            </div>
                          </Card.Content>
                        </Card>
                      </Transition>
                    </Grid.Column>
                  );
                })
              : null}
          </Grid>
        </div>
      </div>
    </div>
  );
};

const stateToProps = ({posts}: any) => ({
  posts: posts.posts,
});

const actionsToProps = (dispatch: any) => ({
  getPosts: (filter: string) => dispatch(GET_POSTS(filter)),
});

export default connect(stateToProps, actionsToProps)(Dashboard);

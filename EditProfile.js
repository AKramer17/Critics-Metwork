import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      favorite: '',
      website: '',
      location: '',
      genre: '',
      others: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring others array back to CSV
      const othersCSV = profile.others.join(',');

      // If profile field doesnt exist, make empty string
      profile.favorite = !isEmpty(profile.favorite) ? profile.favorite : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        favorite: profile.favorite,
        website: profile.website,
        location: profile.location,
        genre: profile.genre,
        others: othersCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      favorite: this.state.favorite,
      website: this.state.website,
      location: this.state.location,
      genre: this.state.genre,
      others: this.state.others,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for genre
    const options = [
      { label: '* Select Genre', value: 0 },
      { label: 'Action', value: 'Action' },
      { label: 'Action-Comedy', value: 'Action-Comedy' },
      { label: 'Adventure', value: 'Adventure' },
      { label: 'Animation', value: 'Animation' },
      { label: 'Comedy', value: 'Comedy' },
      { label: 'Comedy-Drama', value: 'Comedy-Drama' },
      { label: 'Crime', value: 'Crime' },
      { label: 'Documentary', value: 'Documentary' },
      { label: 'Drama', value: 'Drama' },
      { label: 'Epic', value: 'Epic' },
      { label: 'Horror', value: 'Horror' },
      { label: 'Fantasy', value: 'Fantasy' },
      { label: 'Film Noir', value: 'Film Noir' },
      { label: 'Historical Film', value: 'Historical Film' },
      { label: 'Musical', value: 'Musical' },
      { label: 'Mystery', value: 'Mystery' },
      { label: 'Romance', value: 'Romance' },
      { label: 'Romantic Comedy', value: 'Romantic Comedy' },
      { label: 'Science Fiction', value: 'Science Fiction' },
      { label: 'Sport', value: 'Sport' },
      { label: 'Superhero', value: 'Superhero' },
      { label: 'Thriller', value: 'Thriller' },
      { label: 'War', value: 'War' },
      { label: 'Western', value: 'Western' },
      { label: '  ', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile. This will show in the URL as . . . .com/profile/HandleAppearsHere"
                />
                <SelectListGroup
                  placeholder="Genre"
                  name="genre"
                  value={this.state.genre}
                  onChange={this.onChange}
                  options={options}
                  error={errors.genre}
                  info="Select the movie genre of your highest appeal"
                />
                <TextFieldGroup
                  placeholder="Favorite Title"
                  name="favorite"
                  value={this.state.favorite}
                  onChange={this.onChange}
                  error={errors.favorite}
                  info="Your all time favorite movie"
                />
                <TextFieldGroup
                  placeholder="* Other Favorites"
                  name="others"
                  value={this.state.others}
                  onChange={this.onChange}
                  error={errors.others}
                  info="Please use commas to separate your other favorite titles"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Please tell us anything else you'd like other users to know!"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);

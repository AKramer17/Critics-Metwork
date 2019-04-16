import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      genre: "",
      others: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
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
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
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
      { label: "* Select Genre", value: 0 },
      { label: "Action", value: "Action" },
      { label: "Action-Comedy", value: "Action-Comedy" },
      { label: "Adventure", value: "Adventure" },
      { label: "Animation", value: "Animation" },
      { label: "Comedy", value: "Comedy" },
      { label: "Comedy-Drama", value: "Comedy-Drama" },
      { label: "Crime", value: "Crime" },
      { label: "Documentary", value: "Documentary" },
      { label: "Drama", value: "Drama" },
      { label: "Epic", value: "Epic" },
      { label: "Horror", value: "Horror" },
      { label: "Fantasy", value: "Fantasy" },
      { label: "Film Noir", value: "Film Noir" },
      { label: "Historical Film", value: "Historical Film" },
      { label: "Musical", value: "Musical" },
      { label: "Mystery", value: "Mystery" },
      { label: "Romance", value: "Romance" },
      { label: "Romantic Comedy", value: "Romantic Comedy" },
      { label: "Science Fiction", value: "Science Fiction" },
      { label: "Sport", value: "Sport" },
      { label: "Superhero", value: "Superhero" },
      { label: "Thriller", value: "Thriller" },
      { label: "War", value: "War" },
      { label: "Western", value: "Western" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
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

                {/* <TextFieldGroup
                  placeholder="Favorite Title"
                  name="favorite"
                  value={this.state.favorite}
                  onChange={this.onChange}
                  error={errors.favorite}
                  info="Your all time favorite movie"
                /> */}
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
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));

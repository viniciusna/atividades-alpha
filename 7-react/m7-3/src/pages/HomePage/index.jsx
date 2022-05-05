import StandardHeader from '../../components/headers/StandardHeader';
import LogoutButton from '../../components/buttons/LogoutButton';
import './style.css';
import React from 'react'

function HomePage() {

  return React.createElement("div", {
    className: "page",
    id: "home-page"
  }, React.createElement(StandardHeader, null, React.createElement(LogoutButton, null)), React.createElement("main", {
    id: "home-page-main"
  }, React.createElement("div", {
    id: "profile-picture"
  }, React.createElement("img", {
    src: "https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
    alt: "Profile"
  })), React.createElement("div", {
    id: "profile-info"
  }, React.createElement("h2", {
    id: "username"
  }, "Username"), React.createElement("p", {
    id: "email"
  }, "Email: email@example.com"), React.createElement("p", {
    id: "birthdate"
  }, "Birthdate:", ' ', new Date(1998, 9, 30).toLocaleDateString('pt-br', {
    timeZone: 'UTC'
  }))), React.createElement("div", {
    className: "navigate-buttons"
  }, React.createElement("button", {
    id: "edit-button"
  }, "Edit Profile"))));
}

export default HomePage;

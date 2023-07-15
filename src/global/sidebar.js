import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";


const Sidebar = ({ handleCollapsedChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleToggleClick = () => {
    handleCollapsedChange(!collapsed);
  };
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-header-content">
          {collapsed ? (
            <FaAngleDoubleRight
              className="sidebar-toggle"
              onClick={handleCollapsedChange}
            />
          ) : (
            <>
              <FaAngleDoubleLeft
                className="sidebar-toggle"
                onClick={handleCollapsedChange}
              />
              <div className="sidebar-title">Pro Sidebar</div>
            </>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="sidebar-content">
        <ul className="sidebar-menu" style={{ listStyleType: "none" }}>
          <li>
            <NavLink to="/" exact activeClassName="active">
              <FaTachometerAlt className="sidebar-icon" />
              <span className="sidebar-text" style={{ color: "#808080" }}>Dashboard</span>
            </NavLink>
          </li>
         
          <li>
            <div className="sidebar-menu-item">
              <FaRegLaughWink className="sidebar-icon" />
              <span className="sidebar-text" style={{ color: "#808080" }}>With Suffix</span>
              <ul className="sidebar-submenu" style={{ listStyleType: "none" }}>
                <li style={{ color: "#808080" }}>Submenu 1</li>
                <li style={{ color: "#808080" }}>Submenu 2</li>
                <li style={{ color: "#808080" }}>Submenu 3</li>
              </ul>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-item">
              <FaHeart className="sidebar-icon" />
              <span className="sidebar-text" style={{ color: "#808080" }}>With Prefix</span>
              <ul className="sidebar-submenu" style={{ listStyleType: "none" }}>
                <li style={{ color: "#808080" }}>Submenu 1</li>
                <li style={{ color: "#808080" }}>Submenu 2</li>
                <li style={{ color: "#808080" }}>Submenu 3</li>
              </ul>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-item">
              <FaList className="sidebar-icon" />
              <span className="sidebar-text" style={{ color: "#808080" }}>Multi Level</span>
              <ul className="sidebar-submenu" style={{ listStyleType: "none" }}>
                <li style={{ color: "#808080" }}>Submenu 1</li>
                <li style={{ color: "#808080" }}>Submenu 2</li>
                <li style={{ color: "#808080" }}>
                  Submenu 3
                  <ul className="sidebar-submenu" style={{ listStyleType: "none" }}>
                    <li style={{ color: "#808080" }}>Submenu 3.1</li>
                    <li style={{ color: "#808080" }}>Submenu 3.2</li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      {/* Footer */}
      <div className="sidebar-footer">
        <Link to="/profile" className="sidebar-btn">
          <FaUser className="sidebar-icon" />
          <span className="sidebar-text" style={{ color: "#808080" }}>My Account</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
import PropTypes from "prop-types";

const Avatar = ({ image, alt, title, snippets }) => {
   return (
      <div className="avatar">
         <div className="image">
            <img alt={alt} src={require(`../assets/avatar/${image}`)} />
         </div>
      </div>
   )
}

Avatar.defaultProps = {
   title: 'James Dawidson',
   alt: 'avatar',
   image: 'cream.png',
};
 
 export default Avatar;
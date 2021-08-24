import { Link, useRouteMatch } from "react-router-dom";

const CustomLink = (props) =>{
    let match = useRouteMatch({
        path: props.link,
        exact: true
      });
    return (
        <li className={match?"is-active":null}>
            <Link to={props.link}>{props.link.slice(1,2).toUpperCase() + props.link.slice(2,props.link.length)}</Link>
          </li>
    );
}   

export default CustomLink;
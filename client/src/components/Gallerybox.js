import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Gallerybox extends Component{
    render(){
        const {category} = this.props;
        return(
            <Link to={'/' + category} className={ category + " parent"}>
                <p>{category}</p>
                <div className="gradient"></div>
            </Link>
        )
    }
}
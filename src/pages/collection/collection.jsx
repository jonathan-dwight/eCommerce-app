import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../selectors/shop_selector'
import CollectionItem from '../../components/collection-item/collection-item'

import './collection.scss'

const CollectionPage = ({ collection }) => {
    // exact path for shop in app.js was causing this to not rerender
    const { title, items } = collection;

    let categoryItems = items.map(item => {
        return <CollectionItem key={item.id} item={item} />
    })

    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {categoryItems}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    //we pass in state because its a curried function 
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
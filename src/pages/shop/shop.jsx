import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStartAsync } from '../../action/shop_action';


const ShopPage = ({ fetchCollectionsStartAsync, match }) => {
    // will rerender if parent changes, or if state changes, or prop changes
    useEffect(() => {
        fetchCollectionsStartAsync();
    }, [fetchCollectionsStartAsync]);    

    // have to inverse value because of the isCollections Loaded value
    return (
        <div className='shop-page'>
            {/* render takes in function -- paramaters and functions that component needs*/}
            <Route  exact path={`${match.path}`} 
                    component={CollectionsOverviewContainer}/>

            <Route  path={`${match.path}/:collectionId`}
                    component={CollectionPageContainer} /> 
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});


export default connect(null, mapDispatchToProps)(ShopPage);
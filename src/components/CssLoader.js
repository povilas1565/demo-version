import React from 'react';
const CssLoader = React.memo(({isLoading})=>{
    return (
        isLoading && (
            <div className="cssload">
                <div className="cssload_whirlpool"></div>
            </div>
        )
    );
})

export default CssLoader;
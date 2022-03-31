import React from 'react';
import ContentWrapper from "../../components/Content";
import contents from './contents';

const FAQsPage = props => {
    return (
        <ContentWrapper contents={contents} title='FAQs' />
    )
}

export default FAQsPage;
import * as React from 'react';
import * as Markdown from 'remarkable';



class Remarkable extends React.Component {

    constructor(props) {
        super(props);

        let options = {
            linkify: true,
            typographer:  true
        };

        this.md = new Markdown("full", options);
    }

    render() {
        return <div>
            <span dangerouslySetInnerHTML={{ __html: this.md.render(this.props.source || "") }} />
        </div>;
    }
}

export default Remarkable;
import * as React from 'react';
import * as Markdown from 'remarkable';

interface RemarkableProps {
    source: string;
}

class Remarkable extends React.Component<RemarkableProps, {}> {
    md: Markdown;

    constructor(props: RemarkableProps) {
        super(props);

        let options = {
            linkify: true,
            typographer: true
        };

        this.md = new Markdown("full", options);
    }

    render() {
        return <div>
            <span dangerouslySetInnerHTML={{__html: this.md.render(this.props.source || "")}}/>
        </div>;
    }
}

export default Remarkable;
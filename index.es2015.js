//import fromPairs from 'lodash.frompairs'
import NgComponent from 'ngcomponent';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
/**
 * Wraps a React component in Angular. Returns a new Angular component.
 *
 * Usage:
 *
 *   ```ts
 *   type Props = { foo: number }
 *   class ReactComponent extends React.Component<Props, S> {}
 *   const AngularComponent = react2angular(ReactComponent, ['foo'])
 *   ```
 */
export function react2angular(Class, bindingNames) {
    const names = bindingNames
        || (Class.propTypes && Object.keys(Class.propTypes))
        || [];
    const fromPairs = (pairs) => {
        var index = -1, length = pairs ? pairs.length : 0, result = {};
        while (++index < length) {
            var pair = pairs[index];
            result[pair[0]] = pair[1];
        }
        return result;
    };
    return {
        bindings: fromPairs(names.map(_ => [_, '<'])),
        controller: ['$element', class extends NgComponent {
                constructor($element) {
                    super();
                    this.$element = $element;
                }
                render() {
                    render(React.createElement(Class, Object.assign({}, this.props)), this.$element[0]);
                }
                componentWillUnmount() {
                    unmountComponentAtNode(this.$element[0]);
                }
            }]
    };
}
//# sourceMappingURL=index.js.map
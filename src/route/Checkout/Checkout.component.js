import ContentWrapper from '@scandipwa/scandipwa/src/component/ContentWrapper';
import ProgressBar from 'Component/ProgressBar';
import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component';

import {
    BILLING_STEP,
    DETAILS_STEP,
    SHIPPING_STEP
} from './Checkout.config';

class Checkout extends SourceCheckout {
    stepMap = {
        [SHIPPING_STEP]: {
            title: __('Shipping step'),
            url: '/shipping',
            render: this.renderShippingStep.bind(this),
            areTotalsVisible: true,
            renderCartCoupon: this.renderCartCoupon.bind(this),
            progressID: 0
        },
        [BILLING_STEP]: {
            title: __('Billing step'),
            url: '/billing',
            render: this.renderBillingStep.bind(this),
            areTotalsVisible: true,
            renderCartCoupon: this.renderCartCoupon.bind(this),
            progressID: 1
        },
        [DETAILS_STEP]: {
            title: __('Thank you for your purchase!'),
            url: '/success',
            render: this.renderDetailsStep.bind(this),
            areTotalsVisible: false,
            progressID: 2
        }
    };

    render() {
        const {
            checkoutStep
        } = this.props;
        return (
            <main block="Checkout">
                <ProgressBar
                    progressList={["Shipping", "Review & Payments"]}
                    currentID={this.stepMap[checkoutStep].progressID}
                />
                <ContentWrapper
                  wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    { this.renderSummary(true) }
                    <div block="Checkout" elem="Step">
                        { this.renderTitle() }
                        { this.renderGuestForm() }
                        { this.renderStep() }
                        { this.renderLoader() }
                    </div>
                    <div>
                        { this.renderSummary() }
                        { this.renderPromo() }
                        { this.renderCoupon() }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default Checkout;

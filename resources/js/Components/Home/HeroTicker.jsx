import ScrollingTicker from '@/Components/Home/ScrollingTicker';
import { resolveHomeTickerLines } from '@/data/tickerContent';

/** Home page ticker — content from Pages (home) CMS field */
export default function HeroTicker({ tickerText = '' }) {
    return (
        <ScrollingTicker
            items={resolveHomeTickerLines(tickerText)}
            label="Home affirmations"
        />
    );
}

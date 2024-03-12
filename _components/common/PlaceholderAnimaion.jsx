import { TypeAnimation } from "react-type-animation";

const PlaceholderAnimation = () => {
    return (
        <TypeAnimation
            className="absolute top-7 left-8"
            sequence={[
                "What is happening ?",
                1000,
                "What is on your mind ?",
                1000,
                "Where did you go today ?",
                1000,
                "How was your day ?",
                1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "1em", display: "inline-block", opacity: "0.3" }}
            repeat={Infinity}
        />
    );
};

export default PlaceholderAnimation;

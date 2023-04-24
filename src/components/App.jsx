import { useState } from 'react';
import { AppWrapper } from './App.styled';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseStat = grade => {
    switch (grade) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        console.log('Any of grades missing');
    }
  };

  const countTotalFeedback = () => {
    return good + bad + neutral;
  };
  const countPositiveFeedbackPercentage = () => {
    const TotalBeedback = countTotalFeedback();
    const percentOfGoodFeedback = Number(
      Math.round((good * 100) / TotalBeedback)
    );
    if (percentOfGoodFeedback > 0) {
      return percentOfGoodFeedback;
    }
    return 0;
  };

  const totalNumberofFeedback = countTotalFeedback();

  return (
    <AppWrapper>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={increaseStat}
        />
      </Section>
      <Section title="Statistics">
        {totalNumberofFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </AppWrapper>
  );
};

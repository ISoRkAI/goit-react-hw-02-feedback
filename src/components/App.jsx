import React, { Component } from 'react';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import css from './App.module.css';
class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  btnFeedback = e => {
    if (e === 'good') {
      this.setState(prevState => {
        return {
          good: prevState.good + 1,
        };
      });
    } else if (e === 'neutral') {
      this.setState(prevState => {
        return {
          neutral: prevState.neutral + 1,
        };
      });
    } else if (e === 'bad') {
      this.setState(prevState => {
        return {
          bad: prevState.bad + 1,
        };
      });
    }
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const total = neutral + bad + good;
    return total;
  };

  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state;
    const positivePercentage = parseInt((good / (good + neutral + bad)) * 100);
    return positivePercentage;
  };

  render() {
    const option = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();
    return (
      <div className={css.container}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.btnFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total !== 0 && (
            <Statistics
              good={option.good}
              neutral={option.neutral}
              bad={option.bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          )}
          {total === 0 && <Notification message="There is no feedback" />}
        </Section>
      </div>
    );
  }
}

export default App;

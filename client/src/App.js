import "./App.css";
import React from "react";
import { Button, Input, Radio, Form, Container } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionType: "",
      amount: "",
      oldBalanceSource: "",
      newBalanceSource: "",
      oldBalanceDestination: "",
      newBalanceDestination: "",
      displayTransactionType: "not defined",
      displayAmount: "not defined",
      displayOldBalanceSource: "not defined",
      displayNewBalanceSource: "not defined",
      displayOldBalanceDestination: "not defined",
      displayNewBalanceDestination: "not defined",
      displayResult: "",
      reqUrl: "",
    };
  }

  handleChange = (e, { value }) => this.setState({ transactionType: value })

  onSubmitHandler = (event) => {
    event.preventDefault();

    if (this.state.transactionType === "") {
      this.setState({ displayErrorMessage: "Transaction type is required" });
    } else if (this.state.amount === "") {
      this.setState({ displayErrorMessage: "Amount is required" });
    } else if (this.state.oldBalanceSource === "") {
      this.setState({ displayErrorMessage: "Old Balance Source is required" });
    } else if (this.state.newBalanceSource === "") {
      this.setState({ displayErrorMessage: "New Balance Source is required" });
    } else if (this.state.oldBalanceDestination === "") {
      this.setState({
        displayErrorMessage: "Old Balance Destination is required",
      });
    } else if (this.state.newBalanceDestination === "") {
      this.setState({
        displayErrorMessage: "New Balance Destination is required",
      });
    } else {
      this.setState({ displayErrorMessage: "" });
      this.setState({ displayTransactionType: this.state.transactionType });
      this.setState({ displayAmount: this.state.amount });
      this.setState({ displayOldBalanceSource: this.state.oldBalanceSource });
      this.setState({ displayNewBalanceSource: this.state.newBalanceSource });
      this.setState({
        displayOldBalanceDestination: this.state.oldBalanceDestination,
      });
      this.setState({
        displayNewBalanceDestination: this.state.newBalanceDestination,
      });

      const reqUrl =
        "http://localhost:5000/?type=" +
        this.state.transactionType +
        "&amount=" +
        this.state.amount +
        "&oldBalanceSource=" +
        this.state.oldBalanceSource +
        "&newBalanceSource=" +
        this.state.newBalanceSource +
        "&oldBalanceDestination=" +
        this.state.oldBalanceDestination +
        "&newBalanceDestination=" +
        this.state.newBalanceDestination;
      this.setState({ reqUrl: reqUrl });
      console.log(this.state.reqUrl);

      fetch(reqUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.isFraud === "1") {
            this.setState({ displayResult: "Fraudulent" });
          } else {
            this.setState({ displayResult: "not Fraudulent" });
          }
        });
    }
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
    if (nam === "transactionType")
      this.setState({ gender: event.target.value });
  };

  render() {
    return (
      <div>
        <Container>
        <h1>Bank Transaction Fraud Detection</h1>
        <Form onSubmit={this.onSubmitHandler}>
          Transaction Type: <br />
          <Form.Field>
          <Radio
            label="Payment"
            name="transactionType"
            value="1"
            checked={this.state.transactionType === "1"}
            onChange={this.handleChange}
          />
          </Form.Field>
          <Form.Field>
          <Radio
            label="Cash in"
            name="transactionType"
            value="2"
            checked={this.state.transactionType === "2"}
            onChange={this.handleChange}
          />
          </Form.Field>
          <Form.Field>
          <Radio
            label="Cash out"
            name="transactionType"
            value="3"
            checked={this.state.transactionType === "3"}
            onChange={this.handleChange}
          />
          </Form.Field>
          <Form.Field>
          <Radio
            label="Transfer"
            name="transactionType"
            value="4"
            checked={this.state.transactionType === "4"}
            onChange={this.handleChange}
          />
          </Form.Field>
          <Form.Field>
          <Radio
            label="Debit"
            name="transactionType"
            value="5"
            checked={this.state.transactionType === "5"}
            onChange={this.handleChange}
          />
          </Form.Field>
          <Input
            placeholder="Amount"
            type="text"
            name="amount"
            value={this.state.amount}
            onChange={this.myChangeHandler}
          />
          <br />
          <br />
          <Input
            placeholder="Old Balance Source"
            type="text"
            name="oldBalanceSource"
            value={this.state.oldBalanceSource}
            onChange={this.myChangeHandler}
          />
          <br />
          <br />
          <Input
            placeholder="New Balance Source"
            type="text"
            name="newBalanceSource"
            value={this.state.newBalanceSource}
            onChange={this.myChangeHandler}
          />
          <br />
          <br />
          <Input
            placeholder="Old Balance Destination"
            type="text"
            name="oldBalanceDestination"
            value={this.state.oldBalanceDestination}
            onChange={this.myChangeHandler}
          />
          <br />
          <br />
          <Input
            placeholder="New Balance Destination"
            type="text"
            name="newBalanceDestination"
            value={this.state.newBalanceDestination}
            onChange={this.myChangeHandler}
          />
          <br /><br />
          <Button type="submit" primary>Submit</Button>
        </Form>
        <br /> <br />
        <p>{this.state.displayErrorMessage}</p>
        <br />
        <h4>Latest submission of successful form details are</h4>
        <p>Transaction type: {this.state.displayTransactionType}</p>
        <p>Amount: {this.state.displayAmount}</p>
        <p>Old Balance Source: {this.state.displayOldBalanceSource}</p>
        <p>
          Old Balance Destination: {this.state.displayOldBalanceDestination}
        </p>
        <p>New Balance Source: {this.state.displayNewBalanceSource}</p>
        <p>
          New Balance Destination: {this.state.displayNewBalanceDestination}
        </p>
        <p> The result of the transaction is: {this.state.displayResult}</p>
        <br /> <br />
        </Container>
      </div>
    );
  }
}

export default App;

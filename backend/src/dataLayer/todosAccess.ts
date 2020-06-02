import * as AWS from 'aws-sdk';

import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TodoItem } from '../models/TodoItem';



let options = {};
if (process.env.IS_OFFLINE){
    options = {
        region: "localhost",
        endpoint: "http://localhost:8000"
    }
}

export default class TodosAccess {
  constructor(
      private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(options),
      private readonly todosTable = process.env.TODOS_TABLE || "Todos-dev",
      private readonly indexName = process.env.INDEX_NAME || "UserIdIndex"
  ) {}

  async addTodoToDB(todoItem) {
      await this.docClient.put({
          TableName: this.todosTable,
          Item: todoItem
      }).promise();
  }

  async deleteTodoFromDB(todoId, userId) {
      await this.docClient.delete({
          TableName: this.todosTable,
          Key: {
              todoId,
              userId
          }
      }).promise();
  }

  async getTodoFromDB(todoId, userId) {
      const result = await this.docClient.get({
          TableName: this.todosTable,
          Key: {
              todoId,
              userId
          }
      }).promise();

      return result.Item;
  }

  async getAllTodosFromDB(userId) {
    //   console.log("UserID:\n" + userId)
    //   let params = {
    //     TableName: "Todos-dev",
    //     Select: "ALL_ATTRIBUTES"
    //   }
    //   const result = await this.docClient.scan(params).promise();
    // //   console.log("Todos:\n" + this.todosTable)
    // //   console.log("Result:\n" + result)
    //   return [result.Items, {"key": "value"}];
    console.log("User ID ================", userId)


    const result = await this.docClient.query({
        TableName: this.todosTable,
        IndexName: this.indexName,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues:{
            ':userId': `${userId}`,

        }
    }).promise()
    return result.Items as TodoItem[]
  }

  async updateTodoInDB(todoId, userId, updatedTodo) {
      await this.docClient.update({
          TableName: this.todosTable,
          Key: {
              todoId,
              userId
          },
          UpdateExpression: 'set #name = :n, #dueDate = :due, #done = :d',
          ExpressionAttributeValues: {
              ':n': updatedTodo.name,
              ':due': updatedTodo.dueDate,
              ':d': updatedTodo.done
          },
          ExpressionAttributeNames: {
              '#name': 'name',
              '#dueDate': 'dueDate',
              '#done': 'done'
          }
      }).promise();
  }
}
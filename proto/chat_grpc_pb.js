// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var chat_pb = require('./chat_pb.js');

function serialize_chat_MessageRequest(arg) {
  if (!(arg instanceof chat_pb.MessageRequest)) {
    throw new Error('Expected argument of type chat.MessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_MessageRequest(buffer_arg) {
  return chat_pb.MessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chat_MessageResponse(arg) {
  if (!(arg instanceof chat_pb.MessageResponse)) {
    throw new Error('Expected argument of type chat.MessageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_MessageResponse(buffer_arg) {
  return chat_pb.MessageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chat_StreamingRequest(arg) {
  if (!(arg instanceof chat_pb.StreamingRequest)) {
    throw new Error('Expected argument of type chat.StreamingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_StreamingRequest(buffer_arg) {
  return chat_pb.StreamingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chat_StreamingResponse(arg) {
  if (!(arg instanceof chat_pb.StreamingResponse)) {
    throw new Error('Expected argument of type chat.StreamingResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_StreamingResponse(buffer_arg) {
  return chat_pb.StreamingResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ChatServiceService = exports.ChatServiceService = {
  sendMessage: {
    path: '/chat.ChatService/SendMessage',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.MessageRequest,
    responseType: chat_pb.MessageResponse,
    requestSerialize: serialize_chat_MessageRequest,
    requestDeserialize: deserialize_chat_MessageRequest,
    responseSerialize: serialize_chat_MessageResponse,
    responseDeserialize: deserialize_chat_MessageResponse,
  },
  joinChat: {
    path: '/chat.ChatService/JoinChat',
    requestStream: false,
    responseStream: true,
    requestType: chat_pb.StreamingRequest,
    responseType: chat_pb.StreamingResponse,
    requestSerialize: serialize_chat_StreamingRequest,
    requestDeserialize: deserialize_chat_StreamingRequest,
    responseSerialize: serialize_chat_StreamingResponse,
    responseDeserialize: deserialize_chat_StreamingResponse,
  },
};

exports.ChatServiceClient = grpc.makeGenericClientConstructor(ChatServiceService);

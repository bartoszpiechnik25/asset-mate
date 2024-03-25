# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import v1.etf_service_pb2 as etf__service__pb2


class EtfServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetEtf = channel.unary_unary(
                '/EtfService/GetEtf',
                request_serializer=etf__service__pb2.EtfByTicker.SerializeToString,
                response_deserializer=etf__service__pb2.Etf.FromString,
                )
        self.AddEtf = channel.unary_unary(
                '/EtfService/AddEtf',
                request_serializer=etf__service__pb2.EtfByTicker.SerializeToString,
                response_deserializer=etf__service__pb2.Etf.FromString,
                )
        self.GetEtfPerformance = channel.unary_unary(
                '/EtfService/GetEtfPerformance',
                request_serializer=etf__service__pb2.EtfByTicker.SerializeToString,
                response_deserializer=etf__service__pb2.EtfPerformance.FromString,
                )


class EtfServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetEtf(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def AddEtf(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetEtfPerformance(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_EtfServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetEtf': grpc.unary_unary_rpc_method_handler(
                    servicer.GetEtf,
                    request_deserializer=etf__service__pb2.EtfByTicker.FromString,
                    response_serializer=etf__service__pb2.Etf.SerializeToString,
            ),
            'AddEtf': grpc.unary_unary_rpc_method_handler(
                    servicer.AddEtf,
                    request_deserializer=etf__service__pb2.EtfByTicker.FromString,
                    response_serializer=etf__service__pb2.Etf.SerializeToString,
            ),
            'GetEtfPerformance': grpc.unary_unary_rpc_method_handler(
                    servicer.GetEtfPerformance,
                    request_deserializer=etf__service__pb2.EtfByTicker.FromString,
                    response_serializer=etf__service__pb2.EtfPerformance.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'EtfService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class EtfService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetEtf(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/EtfService/GetEtf',
            etf__service__pb2.EtfByTicker.SerializeToString,
            etf__service__pb2.Etf.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def AddEtf(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/EtfService/AddEtf',
            etf__service__pb2.EtfByTicker.SerializeToString,
            etf__service__pb2.Etf.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetEtfPerformance(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/EtfService/GetEtfPerformance',
            etf__service__pb2.EtfByTicker.SerializeToString,
            etf__service__pb2.EtfPerformance.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

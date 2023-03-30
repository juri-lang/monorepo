﻿module Juri.Internal.OutputWriter


open Output
open System


type IOutputWriter =
    abstract member WriteSTD: string -> unit
    abstract member WriteERR: string * int -> unit
    abstract member WriteMET: string -> unit
    
            
type StreamWriter(streams: InterpreterOutputStreams) =
    let streams = streams
    interface IOutputWriter with
        member this.WriteSTD(msg) =
            streams.Standard.Write(msg)
        member this.WriteERR(msg, line) =
            let error = {Message = msg; Line = line}
            streams.Error.Write(error)
        member this.WriteMET(msg) =
            streams.MetaInfo.Write(msg)

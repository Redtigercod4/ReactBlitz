import React from "react";
import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { WebTracerProvider, SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-web";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { registerInstrumentations } from "@opentelemetry/instrumentation";

const consoleExporter = new ConsoleSpanExporter();
const collectorExporter = new OTLPTraceExporter({
    headers: {}
});

const provider = new WebTracerProvider({
    resource: new Resource({
        [SEMRESATTRS_SERVICE_NAME]: process.env.REACT_APP_NAME
    })
});

const fetchInstrumentation = new FetchInstrumentation({});

fetchInstrumentation.setTracerProvider(provider);
provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));
provider.addSpanProcessor(new SimpleSpanProcessor(collectorExporter));
provider.register();

registerInstrumentations({
    instrumentations: [
        fetchInstrumentation
    ],
    tracerProvider: provider
});

const TelemetryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export default TelemetryProvider;

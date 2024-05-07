const client = require('prom-client');

// Создание регистра метрик
const register = new client.Registry();

// Инициализация стандартных метрик
client.collectDefaultMetrics({ register });

// Создание метрик для различных HTTP методов
const httpRequestMethods = new client.Counter({
  name: 'http_request_methods_total',
  help: 'Total number of HTTP requests, grouped by method',
  labelNames: ['method'],
  registers: [register]
});

// Настраиваемая метрика для времени ответа
const httpResponseTime = new client.Histogram({
  name: 'http_response_time_seconds',
  help: 'Duration of HTTP responses in seconds',
  labelNames: ['method', 'endpoint', 'status_code'],
  buckets: [0.1, 0.3, 1.5, 10.5], // примерные границы в секундах
  registers: [register]
});

// Функция для увеличения счетчика методов
function incrementHttpRequestMethod(method) {
  httpRequestMethods.labels(method).inc();
}

// Middleware для замера времени ответа
function responseTimeMiddleware(req, res, next) {
  const start = process.hrtime();
  res.on('finish', () => {
    const diff = process.hrtime(start);
    const responseSeconds = diff[0] + diff[1] / 1e9;
    httpResponseTime.labels(req.method, req.url, res.statusCode).observe(responseSeconds);
  });
  next();
}

// Экспорт функции и регистра для использования в index.js
module.exports = {
  responseTimeMiddleware,
  incrementHttpRequestMethod,
  metricsMiddleware: async (req, res, next) => {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
  }
};
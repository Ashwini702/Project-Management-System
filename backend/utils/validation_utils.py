def required(data, fields): return [f for f in fields if data.get(f) in (None, '')]

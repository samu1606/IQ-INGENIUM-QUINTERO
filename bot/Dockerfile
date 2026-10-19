FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

# Sin privilegios: esto escucha en internet con un webhook público, así que no
# tiene por qué correr como root (la primera versión sí lo hacía y la carpeta
# quedaba en 777). El volumen hereda el dueño de esta carpeta.
RUN useradd --system --uid 10001 --no-create-home bot \
    && mkdir -p /app/data \
    && chown -R bot:bot /app/data

USER bot

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

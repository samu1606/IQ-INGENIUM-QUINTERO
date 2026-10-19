FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

# La carpeta del registro de conversaciones tiene que existir y ser escribible:
# si el volumen se monta vacío, el proceso corre sin privilegios y no podría
# anotar nada. Sin esto, cada conversación se pierde con un EACCES silencioso.
RUN mkdir -p /app/data && chmod 777 /app/data

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

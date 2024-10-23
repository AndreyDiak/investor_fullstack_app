build:
	cd nestjs && npm run build
	cd nestjs && docker compose -f .docker-compose.yaml up -d --remove-orphans
	cd ui && npm run dev 

import dotenv from 'dotenv'
import { vi } from 'vitest'

// Load environment variables from .env.test
dotenv.config({ path: '.env.development' })

// Mock the next/router
vi.mock('next/router', () => require('next-router-mock'))

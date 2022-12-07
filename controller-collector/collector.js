// const recursive = require('recursive-readdir-sync');
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()
import { recursive } from 'recursive-readdir-sync'

recursive(`${__dirname}/routes`)
	.forEach(file => app.use('/tasks', require(file)));
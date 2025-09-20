import React from 'react';
import { Box, Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { storageService } from '../services/storageService';

export default function StatsPage(){
  const links = storageService.getAllLinksArray();

  return <Box sx={{p:3}}>
    <Typography variant="h5" gutterBottom>URL Statistics</Typography>
    {links.length===0 ? <Typography>No URLs created yet</Typography> :
      links.map(link=>(
        <Paper key={link.shortcode} sx={{p:2,mb:2}}>
          <Typography><strong>Short URL:</strong> <a href={`/${link.shortcode}`}>{link.shortcode}</a></Typography>
          <Typography><strong>Original:</strong> {link.longUrl}</Typography>
          <Typography><strong>Created At:</strong> {new Date(link.createdAt).toLocaleString()}</Typography>
          <Typography><strong>Expires At:</strong> {new Date(link.expiresAt).toLocaleString()}</Typography>
          <Typography><strong>Total Clicks:</strong> {link.clicks.length}</Typography>
          {link.clicks.length>0 && <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {link.clicks.map((c,i)=>(
                <TableRow key={i}>
                  <TableCell>{new Date(c.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{c.source || 'Unknown'}</TableCell>
                  <TableCell>{c.location || 'Unknown'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
        </Paper>
      ))
    }
  </Box>
}

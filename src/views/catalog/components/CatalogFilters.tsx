import { Clear, ExpandLess, ExpandMore, FilterList } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useFilters } from '../context';
import { COLOR_OPTIONS, FUEL_TYPE_OPTIONS, INVESTMENT_GRADE_OPTIONS, ORDERING_OPTIONS, RISK_LEVEL_OPTIONS, TRANSMISSION_OPTIONS } from '../types';

interface CatalogFiltersProps {
  onApply?: () => void;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({ onApply }) => {
  const { filters, activeFiltersCount, handleImmediateFilterChange, handleDebouncedFilterChange, clearFilters } = useFilters();
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  const handleClear = () => {
    clearFilters();
    onApply?.();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Filter Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          <Typography variant="h6">Filters</Typography>
          {activeFiltersCount > 0 && <Chip label={activeFiltersCount} size="small" color="primary" />}
        </Box>

        {activeFiltersCount > 0 && (
          <Button variant="outlined" size="small" onClick={handleClear} startIcon={<Clear />}>
            Clear
          </Button>
        )}
      </Box>

      {/* Priority Filters */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Search - debounced */}
        <TextField label="Search" value={filters.search} onChange={(e) => handleDebouncedFilterChange('search', e.target.value)} placeholder="Search vehicles..." size="small" fullWidth />

        {/* Year Range - debounced */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField label="Year Min" type="number" value={filters.year_min} onChange={(e) => handleDebouncedFilterChange('year_min', e.target.value)} size="small" sx={{ flex: 1 }} />
          <TextField label="Year Max" type="number" value={filters.year_max} onChange={(e) => handleDebouncedFilterChange('year_max', e.target.value)} size="small" sx={{ flex: 1 }} />
        </Box>

        {/* Price Range - debounced */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField label="Price Min (만원)" type="number" value={filters.price_min} onChange={(e) => handleDebouncedFilterChange('price_min', e.target.value)} size="small" sx={{ flex: 1 }} />
          <TextField label="Price Max (만원)" type="number" value={filters.price_max} onChange={(e) => handleDebouncedFilterChange('price_max', e.target.value)} size="small" sx={{ flex: 1 }} />
        </Box>

        {/* Mileage - debounced */}
        <TextField label="Max Mileage (km)" type="number" value={filters.mileage_max} onChange={(e) => handleDebouncedFilterChange('mileage_max', e.target.value)} size="small" fullWidth />

        {/* Sort By - immediate */}
        <FormControl size="small" fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select value={filters.ordering} onChange={(e) => handleImmediateFilterChange('ordering', e.target.value)} label="Sort By">
            {ORDERING_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Advanced Filters Accordion */}
      <Accordion
        expanded={advancedFiltersOpen}
        onChange={() => setAdvancedFiltersOpen(!advancedFiltersOpen)}
        sx={{
          '&:before': { display: 'none' },
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <AccordionSummary
          expandIcon={advancedFiltersOpen ? <ExpandLess /> : <ExpandMore />}
          sx={{
            '&:hover': { backgroundColor: 'action.hover' },
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
            Advanced Filters
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Vehicle Specifications */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                Vehicle Specifications
              </Typography>

              {/* Fuel Type - immediate */}
              <FormControl size="small" fullWidth>
                <InputLabel>Fuel Type</InputLabel>
                <Select value={filters.fuel_type} onChange={(e) => handleImmediateFilterChange('fuel_type', e.target.value)} label="Fuel Type">
                  <MenuItem value="">All</MenuItem>
                  {FUEL_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Transmission - immediate */}
              <FormControl size="small" fullWidth>
                <InputLabel>Transmission</InputLabel>
                <Select value={filters.transmission} onChange={(e) => handleImmediateFilterChange('transmission', e.target.value)} label="Transmission">
                  <MenuItem value="">All</MenuItem>
                  {TRANSMISSION_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Color - immediate */}
              <FormControl size="small" fullWidth>
                <InputLabel>Color</InputLabel>
                <Select value={filters.color} onChange={(e) => handleImmediateFilterChange('color', e.target.value)} label="Color">
                  <MenuItem value="">All</MenuItem>
                  {COLOR_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Location - debounced */}
              <TextField label="Location" value={filters.location} onChange={(e) => handleDebouncedFilterChange('location', e.target.value)} placeholder="Enter location..." size="small" fullWidth />
            </Box>

            {/* Quality & Risk Assessment */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                Quality & Risk Assessment
              </Typography>

              {/* Investment Grade - immediate */}
              <FormControl size="small" fullWidth>
                <InputLabel>Investment Grade</InputLabel>
                <Select value={filters.investment_grade} onChange={(e) => handleImmediateFilterChange('investment_grade', e.target.value)} label="Investment Grade">
                  <MenuItem value="">All</MenuItem>
                  {INVESTMENT_GRADE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Risk Level - immediate */}
              <FormControl size="small" fullWidth>
                <InputLabel>Risk Level</InputLabel>
                <Select value={filters.risk_level} onChange={(e) => handleImmediateFilterChange('risk_level', e.target.value)} label="Risk Level">
                  <MenuItem value="">All</MenuItem>
                  {RISK_LEVEL_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Verified - immediate */}
              <FormControl size="small" fullWidth>
                <InputLabel>Verified</InputLabel>
                <Select value={filters.is_verified} onChange={(e) => handleImmediateFilterChange('is_verified', e.target.value)} label="Verified">
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Verified Only</MenuItem>
                  <MenuItem value="false">Not Verified</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Advanced Details */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                Advanced Details
              </Typography>

              {/* Additional Web API Filters */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField label="Max Accidents" type="number" value={filters.accident_count} onChange={(e) => handleDebouncedFilterChange('accident_count', e.target.value)} size="small" sx={{ flex: 1 }} />
                <TextField label="Max Owners" type="number" value={filters.owner_changes} onChange={(e) => handleDebouncedFilterChange('owner_changes', e.target.value)} size="small" sx={{ flex: 1 }} />
              </Box>

              {/* Vehicle Model Slug - debounced */}
              <TextField label="Model Slug" value={filters.vehicle_model_slug} onChange={(e) => handleDebouncedFilterChange('vehicle_model_slug', e.target.value)} placeholder="Enter model slug..." size="small" fullWidth />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CatalogFilters;

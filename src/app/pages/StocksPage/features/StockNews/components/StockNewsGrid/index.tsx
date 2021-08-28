/**
 *
 * StockNewsGrid
 *
 */
import * as React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector } from 'react-redux';
import { selectStockNews } from '../../slice/selectors';
import { useTheme } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';

interface Props {}

export function StockNewsGrid(props: Props) {
  const stockNews = useSelector(selectStockNews);
  const theme = useTheme();
  const matchesSmBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));
  const cols = matchesSmBreakpoint ? 3 : 1;

  return (
    <>
      <ImageList rowHeight={300} cols={cols} gap={10}>
        {stockNews?.articles?.map((article, index) => (
          <ImageListItem key={article.url} cols={index === 3 ? 2 : 1}>
            <img src={article.urlToImage} alt={article.title} />
            <ImageListItemBar
              title={article.title}
              subtitle={
                <span>
                  {article.source?.name} by: {article.author}
                </span>
              }
              actionIcon={
                <IconButton
                  aria-label={`info about ${article.title}`}
                  href={article.url}
                  target="_blank"
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

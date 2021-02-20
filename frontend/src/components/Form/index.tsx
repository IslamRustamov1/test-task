import React, { FC, ChangeEvent, CSSProperties } from 'react';
import { TextField, Box, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { List, AutoSizer } from 'react-virtualized';
import useEventSource from '../../hooks/useEventSource';
import Event from '../Event';
import { EVENT_ROW_HEIGHT, hideErrorDuration, Mode } from '../../utils/constants';
import './styles.css';

const Form: FC = () => {
  const { events, setFilter, activeMode, setActiveMode, error } = useEventSource();

  const onButtonClickHandler = (mode: Mode) => {
    setActiveMode(mode);
  };

  const onTextFieldChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLowerCase());
  };

  const renderEventRow = ({ index, key, style }: EventRow) => (
    <div key={key} style={style}>
      <Event
        type={events[index].type}
        text={events[index].text}
        receivedAt={events[index].receivedAt}
      />
    </div>
  );

  return (
    <Box>
      <Snackbar open={error} autoHideDuration={hideErrorDuration}>
        <MuiAlert severity="error" elevation={6} variant="filled">
          Error occurred
        </MuiAlert>
      </Snackbar>
      <Box className="form__header-box" p={2}>
        <Box mr={2} className="form__button-box">
          <Button
            variant="contained"
            disableElevation
            color={activeMode === Mode.live ? 'primary' : 'default'}
            onClick={() => onButtonClickHandler(Mode.live)}
            className="form__button"
          >
          Live
          </Button>
          <Button
            variant="contained"
            disableElevation
            color={activeMode === Mode.live ? 'default' : 'primary'}
            onClick={() => onButtonClickHandler(Mode.pause)}
            className="form__button"
          >
          Pause
          </Button>
        </Box>
        <TextField
          fullWidth={true}
          onChange={onTextFieldChangeHandler}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          className="form__text-field"
        />
      </Box>
      <Box className="form__body-box">
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowRenderer={renderEventRow}
              rowCount={events.length}
              rowHeight={EVENT_ROW_HEIGHT}
            />
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

interface EventRow {
  index: number;
  key: string;
  style: CSSProperties;
}

export default Form;

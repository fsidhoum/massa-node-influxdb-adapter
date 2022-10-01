const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const logger = require('./logger');

const token = process.env.MNIA_INFLUXDB_TOKEN;
const org = process.env.MNIA_INFLUXDB_ORG;
const bucket = process.env.MNIA_INFLUXDB_BUCKET || 'massa';

const client = new InfluxDB({
  url: process.env.MNIA_INFLUXDB_URL || 'http://localhost:8086',
  token,
});

const saveData = (data) => {
  logger.debug(`Saving the data: ${JSON.stringify(data)}`);

  const stakersPoint = new Point('stakers');

  stakersPoint.uintField('stakers_count', data.stakers.stakers_count);

  const statusPoint = new Point('status');

  statusPoint.uintField('connected_node_count', data.status.connected_node_count);
  statusPoint.uintField('active_node_count', data.status.active_node_count);
  statusPoint.uintField('current_cycle', data.status.current_cycle);
  statusPoint.uintField('in_connection_count', data.status.in_connection_count);
  statusPoint.uintField('out_connection_count', data.status.out_connection_count);
  statusPoint.stringField('node_ip', data.status.node_ip);
  statusPoint.stringField('version', data.status.version);

  const walletInfoPoint = new Point('wallet_info');

  walletInfoPoint.stringField('address', data.wallet_info.address);
  walletInfoPoint.floatField('candidate_balance', data.wallet_info.candidate_balance);
  walletInfoPoint.floatField('final_balance', data.wallet_info.final_balance);
  walletInfoPoint.uintField('active_rolls', data.wallet_info.active_rolls);
  walletInfoPoint.uintField('candidate_rolls', data.wallet_info.candidate_rolls);
  walletInfoPoint.uintField('final_rolls', data.wallet_info.final_rolls);
  walletInfoPoint.uintField('cycle_infos_ok', data.wallet_info.cycle_infos_ok);
  walletInfoPoint.uintField('cycle_infos_nok', data.wallet_info.cycle_infos_nok);
  walletInfoPoint.floatField('cycle_infos_ok_ratio', data.wallet_info.cycle_infos_ok_ratio);

  const writeApi = client.getWriteApi(org, bucket);
  writeApi.writePoints([stakersPoint, statusPoint, walletInfoPoint]);

  writeApi
    .close()
    .then(() => {
      logger.info('Data saved successfully !');
    })
    .catch(e => {
      logger.error(`An error occurred when saving the data. Details: ${e}`);
    });
}

module.exports = saveData;


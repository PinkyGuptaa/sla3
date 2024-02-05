import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  tableColHeader: {
    width: '33.3%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '33.3%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    textAlign: 'center',
    padding: 5,
  },
  tableLastCol: {
    width: '33.4%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    textAlign: 'center',
    padding: 5,
  },
  tableColHeaderSLNo: {
    width: '15%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
  tableColSLNo: {
    width: '15%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
});

const PDFDocument = ({ reportDetails }) => {
  return (
    <PDFViewer width="100%" height={600}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
              <Text style={styles.tableColHeaderSLNo}>SL No.</Text>
                <Text style={styles.tableColHeader}>SLA</Text>
                <Text style={styles.tableColHeader}>Details</Text>
                <Text style={styles.tableColHeader}>Remarks</Text>
              </View>
              {reportDetails.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableColSLNo}>{index + 1}</Text>
                  <Text style={styles.tableCol}>
                    {item.slaMaster ? item.slaMaster.sla : 'N/A'}
                  </Text>
                  <Text style={styles.tableCol}>{item.details || 'N/A'}</Text>
                  <Text style={styles.tableLastCol}>{item.remarks || 'N/A'}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFDocument;
